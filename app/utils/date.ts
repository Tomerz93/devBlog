import { format } from 'date-fns'

const formatDateShort = (date: string) => {
    return format(new Date(date), 'MMMM do')
}

export { formatDateShort }