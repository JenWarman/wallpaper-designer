import { beforeEach, describe, expect, test, vi} from "vitest"
import supabase from "../supabaseClient"
import { registerUser } from "../supabase"

vi.mock("../supabaseClient", () => ({
    default: {
        auth: {
            signUp: vi.fn(),
        },
    },
}))

describe('registerUser', () => {
    const event = { preventDefault: vi.fn()}

    const newUser = {
    username: 'test',
    email: 'test@example.com',
    password: 'test1234'
}

beforeEach(() => {
    vi.clearAllMocks()
})
    test('it registers a new user', async () => {
        const signUpMock = vi.mocked(supabase.auth.signUp)
        signUpMock.mockResolvedValue({ data: {user: {id: 'user-1'}}, error: null})
        const result = await registerUser({newUser, event})
        
        expect(result.success).toBe(true)
        expect(result.data.user.id).toBe('user-1')
    })
    test('it returns an error when registration is unsuccessful', async () => {
        const signUpMock = vi.mocked(supabase.auth.signUp)
        const error = new Error("signUp failed!")

        signUpMock.mockResolvedValue({ data: null, error})
        const result = await registerUser({newUser, event})
        expect(result.success).toBe(false)
        expect(result.error).toBe(error)
    })
})


