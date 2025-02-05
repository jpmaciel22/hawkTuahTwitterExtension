// ==UserScript==
// @name         Hawk Tuah Tweets Replacer
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Substitui tweets com Hawk Tuah
// @author       Você
// @match        *://twitter.com/*
// @match        *://x.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fotoHawkTuah = 'https://pbs.twimg.com/media/GijmN2mXcAEZ-tA?format=jpg&name=medium';
    const profilePicture = 'https://pbs.twimg.com/profile_images/1860896124132827136/BT2g8SSg_400x400.png';

    const postagem = {
        content: `HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH 
                  HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH HAWK TUAH`,
        image: fotoHawkTuah,
    };

    const postador = {
        displayName: "hawk tuah lover",
        handle: "@talktuah",
        profilePicture: profilePicture,
    };

    function capturarTweets() {
        const tweets = [];
        document.querySelectorAll("article[data-testid=tweet]").forEach((tweet) => {
            if (tweet.classList.contains("hawkTuah")) return;

            const tweetTextElement = tweet.querySelector("div[lang]");
            if (tweetTextElement) {
                tweets.push(tweet);
            }
        });
        return tweets;
    }

    function trocarTweets() {
        capturarTweets().forEach((tweet) => {
            tweet.classList.add("hawkTuah");

            const tweetText = tweet.querySelector("div[lang]");
            if (tweetText) {
                tweetText.innerText = postagem.content;
            }

            const pfp = tweet.querySelector("[style*=profile_images]");
            const profile = tweet.querySelector("[data-testid=User-Name]");
            const displayname = profile.querySelector("a:not([tabindex='-1']) span");
            const handle = profile.querySelector("a[tabindex='-1'] span");

            tweet.querySelectorAll("div:has(> img)").forEach((imageContainer) => {
                const imageDiv = imageContainer.querySelector("div[style*=twimg]:not([style*=profile_images])");
                if (imageDiv) {
                    imageDiv.style.backgroundImage = `url(${postagem.image})`;
                    imageDiv.style.backgroundSize = "100% 100%";
                }
    
                const image = imageContainer.querySelector("div[style*=twimg]:not([style*=profile_images])");
                if (image) {
                    image.setAttribute("src", postagem.image);
                }
            })
    
            tweet.querySelectorAll(":has(> video > source)").forEach((videoContainer) => {
                const video = videoContainer.querySelector("video");
                video.setAttribute("poster", postagem.videoPoster);
                document.querySelectorAll("source").forEach((source) => {
                    source.removeAttribute("src");
                });
    
                const _videocontainer = videoContainer.innerHTML;
                videoContainer.innerHTML = "";
                videoContainer.innerHTML = _videocontainer;
            })
    
            if (pfp) { pfp.style.backgroundImage = `url(${postador.profilePicture})` }
            if (displayname) { displayname.innerText = postador.displayName }
            if (handle) { handle.innerText = postador.handle }
            if (tweetText) { tweetText.innerText = postagem.content }
        });
    }

    window.addEventListener("load", setInterval(trocarTweets, 2000));
})();
