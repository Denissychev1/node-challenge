import {Api} from "../utils/api";

describe('GET expenses', () => {
    const endpoint = '/expenses/get-user-expenses';
    test('get expenses by userId', () => {
        return Api.get(endpoint)
            .query({userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474'})
            .expect(200);
    })
    test('return type', async () => {
        let {body} = await Api.get(endpoint)
            .query({userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474'});
        expect(body).toMatchObject({
            totalCount: expect.any(String),
            data: expect.arrayContaining([expect.objectContaining({
                id: expect.any(String),
                merchant_name: expect.any(String),
                amount_in_cents: expect.any(Number),
                currency: expect.any(String),
                date_created: expect.any(String),
                status: expect.any(String),
            })]),
            pageCount: expect.any(Number),
            pageNumber: expect.any(Number),
        })
    })
})