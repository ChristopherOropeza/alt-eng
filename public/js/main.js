const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteLetter);
});

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike);
});

async function deleteLetter() {
    const chName = this.parentNode.childNodes[1].innerText;
    const phValue = this.parentNode.childNodes[3].innerText;
    try {
        const response = await fetch('deleteLetter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'letterS': chName,
                'phoneticValueS': phValue
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err)
    }
}

async function addLike() {
    const chName = this.parentNode.childNodes[1].innerText;
    const phValue = this.parentNode.childNodes[3].innerText;
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'letterS': chName,
                'phoneticValueS': phValue,
                'likesS': tLikes
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err) {
    console.log(err);
    }
}