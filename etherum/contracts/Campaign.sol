
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public apporvers;
    uint public apporversCount;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        apporversCount = 0;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        apporvers[msg.sender] = true;
        apporversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        
        Request memory newRequest = Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        require(apporvers[msg.sender]);
        require(index < requests.length);
    
        Request storage request = requests[index];
        
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        require(index < requests.length);
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > apporversCount/2);
        request.recipient.transfer(request.value);
        request.complete = true;
    } 
}
