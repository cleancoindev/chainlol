# Wagmify.me — Fastest Way to Navigate Crypto

The tool makes it faster to navigate to common crypto sites — instead of going to coin geiko and searching for olympus, you can just type in `p olympus` and the tool will automatically redirect you.

The tool is built with JS and **runs purely locally in the browser** so there are no securty implications about sending search results to an unknown server. 

## Example Commands

Command | Example | Description
--- | --- | ---
p, price | p olympus | Opens CoinGeiko dashboard for the spelled out coin.
tx | tx 0x000.. or tx 1123123 for SOL | Opens Etherscan or Solscan depending on the hash type.
w, wallet | w vitalik.eth | Opens the walllet based on the hash or the ENS name.
commands | commands | Lists available commands.

## Setup

1. Open Chrome and click the three dots. Click `Settings` and scroll down to `Search Engines`.

2. Click `Manage Search Engines`.

3. Add a new search engine with the URL `http://wagmify.me/?q=%s`. Set both name and keyword to `wagmify`.

4. Make this the default search engine.

## Running locally

Call `python3 -m http.server` from the main directory, then naviagte to `http://localhost:8000/?q=commands` 

## Deploying to Wagmify.me 
Once you have setup your `.env`, you can call the following command to deploy:

```
ipfs-deploy . -p pinata -d cloudflare -t "wagmify.me $(date +"%m-%d-%Y %T")"
```
