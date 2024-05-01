document.addEventListener('DOMContentLoaded', () => {
    async function response() {
        const response = await fetch('http://localhost:8080/dashboard.html');
        console.log(response)
    }
    response()
})