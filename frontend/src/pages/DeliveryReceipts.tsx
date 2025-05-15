import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { RuleGroup } from '@/types';
import { createRuleGroup } from '@/lib/utils';
import RuleGroupComponent from '@/components/RuleBuilder/RuleGroupComponent';
import { evaluateAudience, createCampaign } from '@/api/campaignAPI';

const CampaignCreation: React.FC = () => {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState<string>('');
  const [message, setMessage] = useState<string>('Hi {name}, here\'s 10% off on your next order!');
  const [rules, setRules] = useState<RuleGroup>(createRuleGroup());
  const [audienceCount, setAudienceCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);

  // Preview audience size
  const handlePreview = async () => {
    try {
      setPreviewLoading(true);
      const audience = await evaluateAudience(rules);
      setAudienceCount(audience.length);
      toast.success(`Found ${audience.length} customers in this segment`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to preview audience');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Create the campaign
  const handleSubmit = async () => {
    if (!campaignName.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setLoading(true);
      const campaign = await createCampaign(campaignName, rules, message);
      toast.success('Campaign created successfully!');
      navigate('/campaigns');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="campaignName" className="block text-sm font-medium mb-1">
                Campaign Name
              </label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Summer Sale Campaign"
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message Template
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi {name}, here's a special offer for you!"
                className="w-full h-24"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use {'{name}'} to include customer's name in the message.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audience Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-4">
                Define rules to target specific customer segments
              </p>
              <RuleGroupComponent group={rules} onChange={setRules} />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={previewLoading}
              >
                {previewLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Preview Audience
              </Button>
            </div>
            
            {audienceCount !== null && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
                <p className="font-medium">
                  This segment contains {audienceCount} customers
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate('/campaigns')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreation;
