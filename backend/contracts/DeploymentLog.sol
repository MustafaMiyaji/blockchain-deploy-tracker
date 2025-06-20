// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeploymentLog {
    struct Deployment {
        string commitHash;
        string imageId;
        string environment;
        uint256 timestamp;
    }

    Deployment[] public deployments;

    event DeploymentLogged(
        string commitHash,
        string imageId,
        string environment,
        uint256 timestamp
    );

    function logDeployment(
        string memory commitHash,
        string memory imageId,
        string memory environment
    ) public {
        Deployment memory newDeployment = Deployment(
            commitHash,
            imageId,
            environment,
            block.timestamp
        );
        deployments.push(newDeployment);
        emit DeploymentLogged(commitHash, imageId, environment, block.timestamp);
    }

    function getAllDeployments() public view returns (Deployment[] memory) {
        return deployments;
    }
}
