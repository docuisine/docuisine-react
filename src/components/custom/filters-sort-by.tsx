import { CircleIcon } from 'lucide-react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Label } from '@/components/ui/label'

const FiltersSortBy = () => {
  const options = ["Alphabetical", "Total time", "Rating"];
  return (
    <RadioGroupPrimitive.Root data-slot='radio-group' defaultValue='alphabetical' className='grid gap-3'>
        {options.map((option) => (
         <div key={option} className='flex items-center gap-2'>
           <RadioGroupPrimitive.Item
             value={option.toLowerCase().replace(" ", "-")}
             id={`sort-${option.toLowerCase().replace(" ", "-")}`}
             data-slot='radio-group-item'
             className='border-input focus-visible:border-ring focus-visible:ring-ring/50 text-primary-foreground [&_svg]:fill-primary-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary! relative aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow,border] outline-none focus-visible:ring-[3px] [&_svg]:size-4 data-[state=checked]:[&_svg]:size-2'
           >
             <CircleIcon className='fill-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500' />
           </RadioGroupPrimitive.Item>
           <Label htmlFor={`sort-${option.toLowerCase().replace(" ", "-")}`}>{option}</Label>
         </div>
       )) 
        }
    </RadioGroupPrimitive.Root>
  )
}

export default FiltersSortBy;
