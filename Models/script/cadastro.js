document.addEventListener('DOMContentLoaded', () => {
    
    let flash_error = document.querySelector('.flash.error')

    async function showErrorMessage() {
        const response = await fetch('http://localhost:8080/cadastro.html');
    
        if (response.status == 401) {
            flash_error.style.display = 'flex'
        }
        
    }

    showErrorMessage()
      
})