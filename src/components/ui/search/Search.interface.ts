export interface ISearchProps {
	type: string
	name: string
	placeholder: string
	onInput: (e: React.FormEvent<HTMLInputElement>) => void
	value: string
	onFocus: () => void
}
