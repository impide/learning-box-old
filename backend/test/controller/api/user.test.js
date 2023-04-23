import {
    describe, it, expect, vi,
} from 'vitest';

import userDataMapper from '../../../app/models/user';
import userController from '../../../app/controllers/api/user';

describe('getAll', () => {
    it('should return', async () => {
        // ARRANGE
        const users = [
            {
                id: 1,
                email: 'test@gmail.com',
                pseudo: 'Marion',
                avatar: 'https://unsplash.com/fr/photos/nzJFRYsg6jA',
                role: 0,
            },
        ];

        userDataMapper.findAllUsers = vi.fn().mockResolvedValue(users);
        const req = {};
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        // ACT
        await userController.getAll(req, res);
        // ASSERT
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 200, result: users });
    });
});
