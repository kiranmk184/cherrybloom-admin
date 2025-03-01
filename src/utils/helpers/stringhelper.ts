export function getAbbreviation(fullName: string) {
    const words = fullName.split(" ");
    const firstName = words[0];
    const lastName = words[words.length - 1]; // Gets the last name even with middle names

    const firstInitial = firstName.substring(0, 1);
    const lastInitial = lastName.substring(0, 1);

    return `${firstInitial}${lastInitial}`;
}