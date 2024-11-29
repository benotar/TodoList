import {FC} from "react";
import DataCardWrapper from "@/components/reusable/DataCardWrapper.tsx";

import AdminTabs from "@/components/admin/AdminTabs.tsx";


const AdminPage: FC = () => {
    return (
        <DataCardWrapper
            header={"Hi there!"}
            description={"Management of all users, as well as all todos, is located here"}
            footerChildren={<></>}
        >
            <AdminTabs/>
        </DataCardWrapper>
    );
}

export default AdminPage;