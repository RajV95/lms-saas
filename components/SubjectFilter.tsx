"use client";
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

const SubjectFilter = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('subject') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        let newUrl = "";
        if(searchQuery === "all"){
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        }
        else{
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: searchQuery,
            })
        }
        router.push(newUrl,{ scroll: false});
    },[searchQuery])


    return (
            <Select value={searchQuery} onValueChange={setSearchQuery}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject)=>(
                        <SelectItem
                            key={subject}
                            value={subject}
                            className="capitalize"
                        >{subject}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
    )
}

export default SubjectFilter