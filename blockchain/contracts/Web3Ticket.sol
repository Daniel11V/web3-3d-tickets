// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Web3Ticket
 * @dev Un contrato ERC-721 simple para mintear tickets como NFTs.
 * Utiliza un contador para generar automáticamente los Token IDs.
 */
contract Web3Ticket is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3Ticket", "W3T") Ownable(msg.sender) {}

    /**
     * @dev Mintea un nuevo ticket (NFT) y lo asigna a la dirección 'to'.
     * Incrementa el contador de tokens y usa el nuevo valor como tokenId.
     * * NOTA: En este proyecto educativo, la función es 'public'
     * para que cualquier usuario pueda mintear un ticket.
     * En una app real, esto estaría restringido (ej. con un pago).
     */
    function safeMint(address to) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        return tokenId;
    }
}