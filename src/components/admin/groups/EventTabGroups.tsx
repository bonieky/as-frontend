import { Group } from "@/types/Group";
import { useEffect, useState } from "react";
import * as api from '@/api/admin';
import { GroupItem, GroupItemNotFound, GroupItemPlaceholder } from "./GroupItem";
import { GroupAdd } from "./GroupAdd";
import { GroupEdit } from "./GroupEdit";

type Props = {
    eventId: number;
}
export const EventTabGroups = ({ eventId }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const loadGroups = async () => {
        setSelectedGroup(null);
        setLoading(true);
        const groupList = await api.getGroups(eventId);
        setLoading(false);
        setGroups(groupList);
    }

    const handleEditButton = (group: Group) => {
        setSelectedGroup(group);
    }

    useEffect(() => {
        loadGroups();
    }, []);

    return (
        <div>
            <div className="border border-dashed p-3 my-3">
                {!selectedGroup && <GroupAdd eventId={eventId} refreshAction={loadGroups} />}
                {selectedGroup && <GroupEdit group={selectedGroup} refreshAction={loadGroups} />}
            </div>

            {!loading && groups.length > 0 && groups.map(item => (
                <GroupItem
                    key={item.id}
                    item={item}
                    refreshAction={loadGroups}
                    onEdit={handleEditButton}
                />
            ))}
            {loading &&
                <>
                    <GroupItemPlaceholder />
                    <GroupItemPlaceholder />
                </>
            }
            {!loading && groups.length === 0 && <GroupItemNotFound />}
        </div>
    );
}