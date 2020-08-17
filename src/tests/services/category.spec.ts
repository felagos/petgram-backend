import 'reflect-metadata';
import { CategoryService } from "../../services";
import { CategoryRepository } from '../../repository';
import { container } from '../../container';

describe("CategoryService", () => {
    let service: CategoryService;

    beforeEach(() => {
        service = container.resolve<CategoryService>(CategoryService);
    });

    it("should instance", () => {
        expect(service).toBeTruthy();
    });

    it("getAll", async () => {
        CategoryRepository.prototype.getAll = jest.fn().mockResolvedValue([]);
        
        const response = await service.getAll();

        expect(response).toEqual([]);
    });

});