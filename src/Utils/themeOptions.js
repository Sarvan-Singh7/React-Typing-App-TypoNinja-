
const superUserTheme = {
    label: 'Super User',     /*label is used to acces that full object and value is name of the object */
    background: '#262A33',
    textColor: '#ffffffff',
    typeBoxText: '#526777'
}

const darkMagic = {
    label: 'Dark Magic',
    background: '#091F2C',
    textColor: '#A286B8',
    typeBoxText: '#91E4D1',
}

const bentoTheme = {
    label:"Bento",
    background: "#2D394D",
    textColor: "#FF7A90",
    typeBoxText: "#4A768D",
    stats: "#FF7A90"
}

const futureFunkTheme = {
    label: "Future Funk",
    background: "#2E1A47",
    textColor: "#fff",
    typeBoxText: "#C18FFF",
    stats: "#fff"
}

const aetherTheme = {
    label: "Aether",
    background: "#101820",
    textColor: "#EEDAEA",
    typeBoxText: "#CF6BDD",
    stats: "#EEDAEA"
}

export const themeOptions = [
    {value: superUserTheme, label: 'Super User'},   //see that i converted all themes to an array in which i used all with their label as well as values(object da naam).
    {value: darkMagic, label: 'Dark Magic'},
    {value: bentoTheme, label: "Bento"},
    {value: futureFunkTheme, label: "Future Funk"},
    {value: aetherTheme, label: "Aether"}
];