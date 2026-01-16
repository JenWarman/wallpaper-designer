export default function conditionalClassNames(
    classes: Record<string, boolean | undefined | null>
) {
    return Object.entries(classes)
        .reduce((acc, [className, condition]) => {
            if (condition) acc.push(className)
            return acc
        }, [] as string[])
        .join(' ')
}