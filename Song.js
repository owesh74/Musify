  const xhr = new XMLHttpRequest();
    const url = "https://api.github.com/repos/owesh74.github.io/Musify/song"
    // Replace -username- with your GitHub username, -repo- with the repository name, and then :path with a path to the file or folder you want to get the content of (leave blank to ge all files of the repository)

    xhr.open('GET', url, true);

    xhr.onload = function() {
        const data = JSON.parse(this.response);

        console.log(data);
    };
    
    xhr.send();
