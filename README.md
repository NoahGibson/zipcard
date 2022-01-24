# Zipcard
---

Zipcard is a simple to use resume sharing application to be used by recruiters and potential candidates at functions
such as career fairs. The application is currently written as an [Ionic](https://ionicframework.com/) 4 Application.

The current backend for the application is managed via Google's Firebase, and the Firebase project for Zipcard can be
found [here](https://console.firebase.google.com/project/zipcard-65375/overview).

Trello is used for managing project tasks. The board for Zipcard can either be accessed via the Boards tab within the
Bitbucket repo, or at [this link](https://trello.com/b/VJMLUXao/zipcard).

<p float="left">
  <img src="https://user-images.githubusercontent.com/28206685/150871628-116c869a-6e3c-4bfc-9ce0-47e1697e620a.png" width="20%" />
  <img src="https://user-images.githubusercontent.com/28206685/150871741-0849ce64-c012-4eb2-b87d-571ce1dbe0e9.png" width="20%" /> 
  <img src="https://user-images.githubusercontent.com/28206685/150871663-0b6b144c-1a1e-49bf-8a0b-db2607e24e76.png" width="20%" />
  <img src="https://user-images.githubusercontent.com/28206685/150871673-49e38ead-8fe8-4291-b5bd-db86519c7b9b.png" width="20%" />
</p>


### Contents

- [How to use Git](#markdown-header-how-to-use-git)
- [Setting up the Project](#markdown-header-setting-up-the-project)
- [Running the Project](#markdown-header-running-the-project)
- [Accessing Documentation](#markdown-header-accessing-documentation)
- [Back-End Functions](#markdown-header-back-end-functions)


## How to use Git
---

### Downloading Git

In order to use this repository, you will first have to install *Git* on your machine, which can be downloaded from the
following link: [Download Git](https://git-scm.com/downloads). 

### Setting up SSH Credentials

Before you are able to clone the repository from Bitbucket, you must first set up SSH credentials for your Bitbucket
account. See [this link](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html) for detailed steps
on how to set up an SSH key.

1. In Git Bash, run the command: **ssh-keygen**. This will generate a new SSH key for your machine. The command will
give you a few options; it is fine to just keep the defaults by hitting enter for each prompt (without typing anything
in).
2. Open the *id_rsa.pub* file that was just created (should be within the folder C:\Users\<your username>\\.ssh) in a
text editor, and copy the contents of the file to your clipboard.
3. Within Bitbucket, click on your profile image in the bottom left corner, and navigate to Bitbucket Settings -> SSH
Keys.
4. Click on "Add Key", give the key a label (i.e. "Default Public Key"), and paste the key that you copied into the key
field and save the key. 

You should now have the necessary SSH credentials to clone the repository.

### Cloning the Repository

Once Git is installed and you have created an SSH key for your account, you can now clone (create a local copy of) the
repository.

1. Open Git Bash and **cd** into an empty directory to clone the repository into. 
2. Run the command: **git clone <ssh location of repository\>**. In this case, the ssh location is
**git@bitbucket.org:TeamGobbu/zipcard.git**.

### Creating a Branch

In order to avoid errors occurring in the repository's master branch (such as accidently deleting the master branch),
changes to the code must first be made within a separate branch, which will then be merged into the master branch via a
pull request.

To work on a new branch:

1. Within your local copy of the repository, run the command: **git checkout -b <branch name\>**, where <branch name>
should preferably be the Trello number of the card for the task being completed (i.e. T-4). This will create a new
branch on your machine.
2. Now when you commit changes and push them to the repository, these changes will be made to the new branch, as opposed
to the master branch (see Committing and Pushing Changes below).
3. Once you are done with the task, and ready for your changes to be merged into the master branch, you must submit a
pull request. This can be done in Bitbucket under the Pull Requests tab. Select the name of your branch as the merge
from repository, keep master as the merge to repository, and give the request a description, then click Create Request.
4. Your pull request will then be submitted for review before being merged into the master branch.

### Committing and Pushing Changes

In order to commit changes that you have made to your local repository:

1. Run the command **git status** to view all pending changes in your local repository.
2. Run **git add <changes to add\>** in order to stage files for your commit.
3. Once all necessary changes have been added, run **git commit -m "<commit message\>"** in order to commit your
changes.

Once all changes have been committed, you can now push your commits to the remote repository. In order to do so, simply
run **git push origin <branch name\>** in order to push your changes.


## Setting up the Project
---

### Installing Node.js and NPM

Node.js and the Node Package Manager (NPM) are required in order to use Ionic. Download both of them
[here](https://www.npmjs.com/get-npm).

### Installing Ionic

In order to install Ionic, run the command: **npm install -g ionic cordova** in the terminal, or follow
[these](https://ionicframework.com/docs/intro/installation/) instructions from Ionic's website.

### Installing Dependencies

There are dependencies that first need to be installed in order to run the ionic application. Run the command: **npm
install** in order to have these installed locally for this project.


## Running the Project
---

After following the steps in *Setting up Project*, run **ionic serve** within the root directory of the Ionic project in
order to preview the application on your computer's browser.

To run the application on Android, plug the phone into a USB port on the machine, turn on USB Debugging within Developer
Options, and then run **ionic cordova run andriod** within the Ionic project.


## Accessing Documentation
---

[CompoDoc](https://compodoc.app/) is used for documentation. However, this documenation is not public, and not kept under version control.

In order to access the documenation, run the command **npm run compodoc** within the project directory. This may take a
few minutes to complete. Once finished, the documenation will be hosted and can be accessed at the link shown in the
command output.


## Back-End Functions
---

This project uses Google Firebase's [Cloud Functions](https://firebase.google.com/docs/functions/) in order to make
updates and maintain the back-end of the application. These functions are defined within the *functions* directory at
the root of the project.

Anytime a new function is added or an old function is updated within the source code, in order for these changes to be
made globally (that is, the function is actually operable), they first need to be deployed to Firebase. In order to do
this:

1. First, install the Firebase CLI tools to your machine. This is done by running the command **npm install -g
firebase-tools**.
2. After the CLI tools are installed, within the *functions* directory, run the command **firebase deploy --only
functions** each time updates to the cloud functions are ready to be deployed.

