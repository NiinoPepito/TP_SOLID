import MentoringSlotRepository from "@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository";
import MentoringSlot from "../../model/entity/mentoring-slot.entity";

export class GetMentoringSlotsByMissedService {
    constructor(
        private readonly mentoringSlotRepository: MentoringSlotRepository
    ) {}

    async getMentoringSlotsByMissed() : Promise<MentoringSlot[]> {
        const mentoringSlots = this.mentoringSlotRepository.findMentoringSlotsByMissed();
        return mentoringSlots;
    }

}