 (() => {
    let videos = [];
    try {
        fetch('https://cdn-media.brightline.tv/training/demo.json')
            .then(response => response.json())
            .then(data => {
                videos = data.streams;
                setupGrid(videos);
            });
    } catch (e) {
        console.log(e);
    }

    function setupGrid(videos) {
        let grid = document.getElementById('grid');
        for (let [index, video] of videos.entries()) {
            let gridItem = document.createElement('div');
            gridItem.className = 'grid__item';
            gridItem.tabIndex = 0;
            gridItem.id = index;
            let nameDiv = document.createElement('div');
            nameDiv.appendChild((document.createTextNode((video.name))));
            nameDiv.className = 'name';
            gridItem.appendChild(nameDiv);
            grid.appendChild(gridItem);
        }
    }

    let focusedItemIndex = -1;

    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.code === "ArrowLeft") 
            move('left');
        else if (e.code === "ArrowUp")
            move('up');
        else if (e.code === "ArrowRight")
            move('right')
        else if (e.code === "ArrowDown")
            move('down');
        else if (e.code === "Enter")
            playVideo();
        else if (e.code === "Backspace")
            hideVideo();
    }, true);
    
    function move(direction) {
        if(direction === 'right') {
            if (focusedItemIndex === videos.length || focusedItemIndex === videos.length -1) {
                focusedItemIndex = -1;
            }
            focusedItemIndex++;
            document.getElementById(focusedItemIndex).focus();
        } else if (direction === 'left') {
            if (focusedItemIndex === -1 || focusedItemIndex === 0) {
                focusedItemIndex = videos.length;
            }
            focusedItemIndex--;
            document.getElementById(focusedItemIndex).focus();
        } else if (direction === 'up') {
            if( focusedItemIndex > 2) {
                focusedItemIndex = focusedItemIndex - 3;
                document.getElementById(focusedItemIndex).focus();
            }
        } else if(direction === 'down') {
            if (focusedItemIndex <= videos.length - 2) {
                focusedItemIndex = focusedItemIndex + 3;
                document.getElementById(focusedItemIndex).focus();
            }
        }
    }

    function playVideo() {
        let grid = document.getElementById('grid');
        grid.style.display = 'none';
        let videoElement = document.getElementById('video');
        videoElement.style.display = 'block';
        let video = videos[focusedItemIndex];
        videoElement.src = video.mediaFile;
    }

    function hideVideo() {
        let videoElement = document.getElementById('video');
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.style.display = 'none';    
        let grid = document.getElementById('grid');
        grid.style.display = 'grid';
    }
 })();