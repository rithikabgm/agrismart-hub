import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LandSearchProps {
  onSearch?: (query: string, filters: { district: string; state: string }) => void;
}

export const LandSearch: React.FC<LandSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [state, setState] = React.useState('');

  const handleSearch = () => {
    onSearch?.(query, { district, state });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Search Land Records</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Enter Survey Number, Owner Name, or Location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-secondary/30"
          />
        </div>
        
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="bg-secondary/30">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="up">Uttar Pradesh</SelectItem>
            <SelectItem value="gujarat">Gujarat</SelectItem>
            <SelectItem value="maharashtra">Maharashtra</SelectItem>
            <SelectItem value="punjab">Punjab</SelectItem>
          </SelectContent>
        </Select>

        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="bg-secondary/30">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="varanasi">Varanasi</SelectItem>
            <SelectItem value="lucknow">Lucknow</SelectItem>
            <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSearch} className="gap-2">
          <Search className="h-4 w-4" />
          Search Records
        </Button>
      </div>
    </div>
  );
};
