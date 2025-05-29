const div = document.getElementById("moveable");

window.addEventListener("load", () => {
    const ws = new WebSocket('ws://192.168.1.111:1337');

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const divLeft = div.offsetLeft;
        const divTop = div.offsetTop;
        div.style.left = (divLeft - data.x * 100) + "px";
        div.style.top = (divTop - data.y * 100) + "px";
    }
});