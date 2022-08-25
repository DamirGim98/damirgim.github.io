import axios from 'axios'

export default class AuthorService {
    static async getAll() {
        try {
            const response = await axios.get('https://test-front.framework.team/authors')
            return response.data
        } catch (e) {
            console.log('failed to fetch')
        }

    }
}