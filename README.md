# Wagmify.me — Navigate Crypto

The tool makes it faster to navigate to common crypto sites — instead of going to coin geiko and searching for olympus, you can just type in `p olympus` and the tool will automatically redirect you.

The tool is built with JS and **runs purely locally in the browser** so there are no securty implications about sending search results to an unknown server. 

## Example Commands

Command | Example | Description
--- | --- | ---
p, price | p olympus | Opens CoinGeiko dashboard for the spelled out coin.
tx | tx 0x000.. or tx 1123123 for SOL | Opens Etherscan or Solscan depending on the hash type.
w, wallet | w vitalik.eth | Opens the walllet based on the hash or the ENS name.
commands | commands | Lists available commands.
nft | nft chain runners | Searches for the NFT keyword in the OpeanSea.
s, swap | swap ohm dai | Opens uniswap with the two coins to swap.
ipfs | ipfs Qmd8nEQ2K6Uw67oFjM8FQo6K8qdvkaKMDwN91TBprC7EJ6 | Opens the file with the hash on IPFS.
ar | ar Qmd8nEQ2K6Uw67oFjM8FQo6K8qdvkaKMDwN91TBprC7EJ6 | Opens the file with the hash on ARWeave.
ipns | ipns kunalm.xyz | Opens the domain on IPNS.

## Setup

1. Open Chrome and click the three dots. Click `Settings` and scroll down to `Search Engines`.

2. Click `Manage Search Engines`.

3. Add a new search engine with the URL `http://wagmify.me/?q=%s`. Set both name and keyword to `wagmify`.

4. Make this the default search engine.

Should look like this:

<img width="507" alt="Screen Shot 2021-12-03 at 10 16 55 AM" src="https://user-images.githubusercontent.com/796815/144655260-34d032f9-b52a-46f6-9ac1-32047024db98.png">



## Running locally

Call `python3 -m http.server` from the main directory, then naviagte to `http://localhost:8000/?q=commands` 

## Deploying to Wagmify.me 
Once you have setup your `.env`, you can call the following command to deploy:

```
ipfs-deploy . -p pinata -d cloudflare -t "wagmify.me $(date +"%m-%d-%Y %T")"
```
