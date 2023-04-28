export default function clearElement(main: HTMLElement) {
    while (main.firstChild) {
        main.removeChild(main.firstChild)
    }
}
