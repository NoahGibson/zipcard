# Zipcard

Zipcard is a simple to use resume sharing application to be used by recruiters and potential candidates at functions such as career fairs. The application uses the power of NFC (Near Field Communication) technology in order to quickly share resumes between individuals. The application is currently written as an [Ionic](https://ionicframework.com/) 4 Application.

---

## How to use Git

### Downloading Git

In order to use this repository, you will first have to install *Git* on your machine, which can be downloaded from the following link: [Download Git](https://git-scm.com/downloads). 

### Setting up SSH Credentials

Before you are able to clone the repository from Bitbucket, you must first set up SSH credentials for your Bitbucket account. See [this link](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html) for detailed steps on how to set up an SSH key.

1. In Git Bash, run the command: **ssh-keygen**. This will generate a new SSH key for your machine. The command will give you a few options; it is fine to just keep the defaults by hitting enter for each prompt (without typing anything in).
2. Open the *id_rsa.pub* file that was just created (should be within the folder C:\Users\<your username>\\.ssh) in a text editor, and copy the contents of the file to your clipboard.
3. Within Bitbucket, click on your profile image in the bottom left corner, and navigate to Bitbucket Settings -> SSH Keys.
4. Click on "Add Key", give the key a label (i.e. "Default Public Key"), and paste the key that you copied into the key field and save the key. 

You should now have the necessary SSH credentials to clone the repository.

### Cloning the Repository

Once Git is installed and you have created an SSH key for your account, you can now clone (create a local copy of) the repository.

1. Open Git Bash and **cd** into an empty directory to clone the repository into. 
2. Run the command: **git clone <ssh location of repository\>**. In this case, the ssh location is **git@bitbucket.org:TeamGobbu/zipcard.git**.

### Creating a Branch

In order to avoid errors occurring in the repository's master branch (such as accidently deleting the master branch), changes to the code must first be made within a separate branch, which will then be merged into the master branch via a pull request.

To work on a new branch:

1. Within your local copy of the repository, run the command: **git checkout -b <branch name\>**, where <branch name> should preferably be the Trello number of the card for the task being completed (i.e. T-4). This will create a new branch on your machine.
2. Now when you commit changes and push them to the repository, these changes will be made to the new branch, as opposed to the master branch (see Committing and Pushing Changes below).
3. Once you are done with the task, and ready for your changes to be merged into the master branch, you must submit a pull request. This can be done in Bitbucket under the Pull Requests tab. Select the name of your branch as the merge from repository, keep master as the merge to repository, and give the request a description (can simply be the copied description from the Trello card), then click Create Request.
4. Your pull request will then be submitted for review before being merged into the master branch.

### Committing and Pushing Changes

In order to commit changes that you have made to your local repository:

1. Run the command **git status** to view all pending changes in your local repository.
2. Run **git add <changes to add\>** in order to stage files for your commit.
3. Once all necessary changes have been added, run **git commit -m "<commit message\>"** in order to commit your changes.

Once all changes have been committed, you can now push your commits to the remote repository. In order to do so, simply run **git push origin <branch name\>** in order to push your changes.

---

## Setting up Project

### Installing Node.js and NPM

Node.js and the Node Package Manager (NPM) are required in order to use Ionic. Download both of them [here](https://www.npmjs.com/get-npm).

### Installing Ionic

In order to install Ionic, run the command: **npm install -g ionic cordova** in the terminal, or follow [these](https://ionicframework.com/docs/intro/installation/) instructions from Ionic's website.

### Installing Dependencies

There are dependencies that first need to be installed in order to run the ionic application. Run the command: **npm install** in order to have these installed locally for this project.

Currently, there is an issue with the Linkedin Plugin used for signing into the application. In order to fix this issue, first run the command **ionic cordova build android**, then navigate to the file */platforms/android/cordova-plugin-linkedin/zipcard-LinkedIn.gradle* and change:

```
dependencies {
  compile 'com.mcxiaoke.volley:library:1.0.+'
}
```

to:

```
dependencies {
  compile 'com.mcxiaoke.volley:library:1.0.+'
  compile files('src/main/libs/linkedin.jar')
}
```


---

## Running the Project

After following the steps in *Setting up Project*, run **ionic serve** within the root directory of the Ionic project in order to preview the application on your computer's browser.

To run the application on Android, plug the phone into a USB port on the machine, turn on USB Debugging within Developer Options, and then run **ionic cordova run andriod** within the Ionic project.

---