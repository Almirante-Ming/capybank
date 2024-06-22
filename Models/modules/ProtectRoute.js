export function ProtectRoute() {
    const redirectTo = window.location.href.includes("Models") ? '../Models/login.html' : 'login.html'
    window.location.href = redirectTo
}