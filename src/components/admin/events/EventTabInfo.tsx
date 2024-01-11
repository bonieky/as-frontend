import { Event } from "@/types/Event"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    event: Event;
    refreshAction: () => void;
}
export const EventTabInfo = ({ event, refreshAction }: Props) => {
    const [titleField, setTitleField] = useState(event.title);
    const [descriptionField, setDescriptionField] = useState(event.description);
    const [groupedField, setGroupedField] = useState(event.grouped);
    const [statusField, setStatusField] = useState(event.status);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o titulo'),
        descriptionField: z.string().min(1, 'Preencha a descrição'),
        groupedField: z.boolean(),
        statusField: z.boolean()
    });

    useEffect(() => {
        setErrors([]);
        const data = eventSchema.safeParse({ titleField, descriptionField, groupedField, statusField });
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [titleField, descriptionField, groupedField, statusField]);

    const handleSaveButton = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedEvent = await api.updateEvent(
            event.id,
            {
                title: titleField,
                description: descriptionField,
                grouped: groupedField,
                status: statusField
            }
        );
        setLoading(false);
        if (updatedEvent) {
            refreshAction();
        } else {
            alert('Não foi possível sortear com esses grupos/pessoas');
        }
    }

    return (
        <div className="my-3">
            <div className="mb-5">
                <label>Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitleField(e.target.value)}
                    placeholder="Digite o título do evento"
                    errorMessage={errors.find(item => item.field === 'titleField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.target.value)}
                    placeholder="Digite a descrição do evento"
                    errorMessage={errors.find(item => item.field === 'descriptionField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="flex mb-5">
                <div className="flex-1">
                    <label>Agrupar sorteio?</label>
                    <input
                        type="checkbox"
                        checked={groupedField}
                        onChange={e => setGroupedField(!groupedField)}
                        className="block w-5 h-5 mt-3"
                        disabled={loading}
                    />
                </div>
                <div className="flex-1">
                    <label>Evento liberado?</label>
                    <input
                        type="checkbox"
                        checked={statusField}
                        onChange={e => setStatusField(!statusField)}
                        className="block w-5 h-5 mt-3"
                        disabled={loading}
                    />
                </div>
            </div>
            <div>
                <Button
                    value={loading ? 'Salvando...' : 'Salvar'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}