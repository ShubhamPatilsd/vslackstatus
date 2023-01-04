# VSlack

Update your Slack status based on your activity in VSCode

<p align="center">
<img src="https://cloud-otr2sd9a1-hack-club-bot.vercel.app/0image.png" /></p>

## The One Singular Feature

- Show what file and what workspace you are working in on your Slack status
- Ex: `Editing package.json in advent_of_code_2022` 

## Requirements

1. You need an emoji in your Slack workspace called `:vsc:` with the VSCode icon for the status to work.

2. You need a Slack User Token and a Signing Secret.

Go to https://api.slack.com/apps/ and press that shiny "Create New App" button
<img src="https://cloud-izu52zfib-hack-club-bot.vercel.app/0image.png"/>

<p>Select the from "From Scratch" option:</p>
<img src="https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/0image.png"/>


<p>Input the name (just make something up) and input workspace that you want the extension to update your profile in:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/1image.png)

Copy the Signing Secret on this section of the resulting page:
![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/2image.png)

<p>Navigate to the "OAuth & Permissions" section of the sidebar:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/3image.png)

<p>Scroll down to the "User Token Scopes" section:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/4image.png)

<p>Add the following scopes:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/5image.png)

<p>Scroll up to the "OAuth Tokens for Your Workspace" section and hit the "Install to Workspace" button:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/6image.png)

<p>Accept on the following screen:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/7image.png)

<p>Copy the User OAuth Token from the "OAuth Tokens for Your Workspace" section on the page that it redirects to:</p>

![](https://cloud-fwxcwxvaq-hack-club-bot.vercel.app/8image.png)


<p>Navigate over to VSCode. Open the settings page (`Ctrl+,` or `Cmd+,`). Type `"vslack"` in the search bar.</p>

![](https://cloud-mpx2npspn-hack-club-bot.vercel.app/0image.png)

Here, you will see two boxes corresponding to the Signing Secret and the User Token. Input the credentials that you copied from the previous steps here and press enter in each box.

Restart VSCode and you're good to go!

## Extension Settings

* `vslack.userToken`: Slack User Token
* `vslack.signingSecret`: Slack Signing Secret

# Made for the Hack Club Community

<img src="https://assets.hackclub.com/flag-standalone.png" align="center"/>

<br>
This extension was created for members of the Hack Club Slack. However, anyone is able to use it for their own workspaces!

## What is [Hack Club](https://hackclub.com)? 
Hack Club is a community of 20k+ teen coders from around the world. Join [our Slack](https://hackclub.com/slack/) to gain access to this community and talk with some really cool people!