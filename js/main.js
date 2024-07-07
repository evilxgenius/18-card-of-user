const cleanName = (name) => {
    let value;

    value = name.replace(/\s{2,}/g, ' ');

    console.log(value);

    [' ', '-'].forEach((s) => {
        value = value.split(s).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(s);
    });

    return value;
};
const cleanEmail = (email) => email.replace(/\s/g, '').toLowerCase();
const cleanYearOfBirth = (yearOfBirth) => +yearOfBirth.replace(/\s/g, '');

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    let firstName = e.target.querySelector('.form__first-name').value.trim();
    let lastName = e.target.querySelector('.form__last-name').value.trim();
    let email = e.target.querySelector('.form__email').value.trim();
    let yearOfBirth = e.target.querySelector('.form__year-of-birth').value.trim();
    const currentYear =  new Date().getFullYear();

    if (firstName) {
        firstName = cleanName(firstName);
    } else {
        alert('Please enter first name');
        return;
    }

    if (lastName) {
        lastName = cleanName(lastName);
    } else {
        alert('Please enter last name');
        return;
    }

    if (email) {
        email = cleanEmail(email);

        if (!email.match(/@/)) {
            email = `not valid email <b>${email}</b> (symbol @ not exist)`;
        } else if (email.charAt(0) === '@') {
            email = `not valid email <b>${email}</b> (symbol @ find in first place)`;
        } else if (email.charAt(email.length - 1) === '@') {
            email = `not valid email <b>${email}</b> (symbol @ find in last place)`
        } else if (!email.match(/\.[a-z]+$/)) {
            email = `not valid email <b>${email}</b> (domain isn't added)`;
        }
    } else {
        alert('Please enter email');
        return;
    }

    if (yearOfBirth) {
        yearOfBirth = cleanYearOfBirth(yearOfBirth);

        console.log(isNaN(yearOfBirth))
        console.log(yearOfBirth < 1900 && yearOfBirth > currentYear)
        if (isNaN(yearOfBirth) || yearOfBirth < 1900 || yearOfBirth > currentYear) {
            alert(`Please pass year in 1900...${currentYear}`);
            return;
        }
    } else {
        alert('Please enter year of birth');
        return;
    }

    document.querySelector('.info').innerHTML = `
        <ul class="info__list">
            <li class="info__item">Full name: ${firstName} ${lastName}</li>
            <li class="info__item">Email: ${email}</li>
            <li class="info__item">Age: ${currentYear - yearOfBirth}</li>
        </ul>
    `;
});
