// TODO: bring authentification functions here (not in app.mjs)
function usernameValid(username) {

    const underscoreCount = username.split('').reduce((acc, cur) => {
        const increment = (cur === '_') ? 1 : 0;
        return acc + increment;
    }, 0);

    const firstLetter = username[0];

    if (underscoreCount > 2 || firstLetter === "_") return false;

    const alnumUnderscore =  /^[a-zA-Z0-9_]+$/;
    return (username.length >= 6 && username.length <= 20 && alnumUnderscore.test(username));
}

function passwordValid(password) {
    if (password.length < 8) return false;

    const InitialLetterCount = {
        upperCase: 0,
        lowerCase: 0,
        number: 0,
        specialLetter: 0
    }

    const letterCounts = password.split('').reduce((acc, cur) => {
        
        if (/[a-z]/.test(cur)) {
            acc["upperCase"]++;
        } else if (/[A-Z]/.test(cur)) {
            acc["lowerCase"]++;
        } else if (/[0-9]/.test(cur)) {
            acc["number"]++;
        } else {
            acc["specialLetter"]++;
        }
        return acc;

    }, InitialLetterCount)

    for (const key in letterCounts) {
        if (!letterCounts[key]) return false;
    }
    
    return true;
}

// console.log(usernameValid("username"));

export {
    usernameValid,
    passwordValid
}