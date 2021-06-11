export const dateToNum = (date: string, time: string) => {
	return +date
		.split('.')
		.reverse()
		.concat(time.split(':'))
		.reduce((acc, val) => acc + val)
}
