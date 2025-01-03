export type SearchProps = {
    loadUser: (username: string) => Promise<void>,
    cooldown: number | null
}