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
        console.log(videos)
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
            console.log(video.name)
        }
    }

    let focusedItemIndex = 0;

    window.addEventListener('keydown', (e) => {
        if (e.code === "ArrowLeft") 
            move('left');
        else if (e.code === "ArrowUp")
        console.log('move up');

            // moveUp();
        else if (e.code === "ArrowRight") // right
            move('right')
        else if (e.code === "ArrowDown")
        console.log('move down');

            // moveDown();
        else if (e.code === "Enter")
            playVideo();
        else if (e.code === "Backspace")
            hideVideo();
    }, true);
    
    function move(direction) {
        console.log(focusedItemIndex)
        if(direction === 'right') {
            if (focusedItemIndex === videos.length) {
                focusedItemIndex = 0;
            }
            document.getElementById(focusedItemIndex).focus();
            focusedItemIndex++;
        } else if (direction === 'left') {
            if (focusedItemIndex === -1) {
                focusedItemIndex = videos.length - 1;
            }
            document.getElementById(focusedItemIndex).focus();
            focusedItemIndex--;
        }
    }

    function playVideo() {
        let grid = document.getElementById('grid');
        grid.style.display = 'none';
        let videoElement = document.getElementById('video');
        videoElement.style.display = 'block';
        // videoElement.requestFullscreen();
        let video = videos[focusedItemIndex];
        videoElement.src = video.mediaFile;
        console.log(video)
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