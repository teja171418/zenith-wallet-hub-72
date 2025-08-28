import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Upload, Plus, UserPlus, Globe, Lock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [currency, setCurrency] = useState("USD");
  const [memberEmails, setMemberEmails] = useState([""]);
  const {
    toast
  } = useToast();
  const addMemberField = () => {
    setMemberEmails([...memberEmails, ""]);
  };
  const updateMemberEmail = (index: number, email: string) => {
    const updated = [...memberEmails];
    updated[index] = email;
    setMemberEmails(updated);
  };
  const removeMemberField = (index: number) => {
    if (memberEmails.length > 1) {
      setMemberEmails(memberEmails.filter((_, i) => i !== index));
    }
  };
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Success!",
      description: `Group "${groupName}" created successfully`
    });

    // Reset form
    setGroupName("");
    setDescription("");
    setMemberEmails([""]);
  };
  return <div className="min-h-screen pt-32 pb-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-green mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Create New Group</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Set up a new expense group to track shared costs with friends, family, or colleagues
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card bg-green-400">
              <CardHeader className="bg-green-300">
                <CardTitle className="text-green flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Group Details
                </CardTitle>
                <CardDescription>Basic information about your expense group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 bg-green-400">
                {/* Group Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-green/20">
                    <AvatarImage className="bg-gradient-green" />
                    <AvatarFallback className="bg-green text-white text-xl">
                      {groupName.charAt(0).toUpperCase() || "G"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="border-green text-green hover:bg-green hover:text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended: 400x400px</p>
                  </div>
                </div>

                {/* Group Name */}
                <div className="space-y-2">
                  <Label htmlFor="group-name" className="text-green font-medium">Group Name *</Label>
                  <Input id="group-name" placeholder="e.g., Vacation Trip 2024" value={groupName} onChange={e => setGroupName(e.target.value)} className="border-green/30 focus:border-green bg-gray-100" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-green font-medium">Description</Label>
                  <Textarea id="description" placeholder="Tell members what this group is for..." value={description} onChange={e => setDescription(e.target.value)} rows={3} className="border-green/30 focus:border-green resize-none bg-sky-200" />
                </div>

                {/* Privacy & Currency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-400">
                  <div className="space-y-2">
                    <Label className="text-green font-medium">Privacy</Label>
                    <Select value={privacy} onValueChange={setPrivacy}>
                      <SelectTrigger className="border-green/30 focus:border-green">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Private - Invite only
                          </div>
                        </SelectItem>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Public - Anyone can join
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-green font-medium">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="border-green/30 focus:border-green">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invite Members */}
            <Card className="glass-card bg-green-400">
              <CardHeader>
                <CardTitle className="text-green flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Invite Members
                </CardTitle>
                <CardDescription>Add members by email address (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {memberEmails.map((email, index) => <div key={index} className="flex gap-2">
                    <Input placeholder="member@example.com" value={email} onChange={e => updateMemberEmail(index, e.target.value)} className="border-green/30 focus:border-green bg-green-500" />
                    {memberEmails.length > 1 && <Button variant="outline" size="icon" onClick={() => removeMemberField(index)} className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                        ×
                      </Button>}
                  </div>)}
                
                <Button variant="outline" onClick={addMemberField} className="w-full border-green text-green hover:bg-green hover:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Member
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card className="glass-card bg-green-400">
              <CardHeader>
                <CardTitle className="text-green">Preview</CardTitle>
                <CardDescription>How your group will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <Avatar className="w-16 h-16 mx-auto border-4 border-green/20">
                    <AvatarImage className="bg-gradient-green" />
                    <AvatarFallback className="bg-green text-white">
                      {groupName.charAt(0).toUpperCase() || "G"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {groupName || "Group Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {description || "Group description will appear here"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {privacy === "private" ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      {privacy === "private" ? "Private" : "Public"}
                    </span>
                    <span>{currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card bg-green-400">
              <CardHeader>
                <CardTitle className="text-green text-sm">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p>• Choose a descriptive name for easy identification</p>
                  <p>• Add a description to help members understand the purpose</p>
                  <p>• You can invite more members later</p>
                  <p>• Privacy settings can be changed after creation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:text-green bg-green-500 hover:bg-green-400">
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} size="lg" className="bg-gradient-green hover:bg-green text-white px-8">
            <Users className="w-5 h-5 mr-2" />
            Create Group
          </Button>
        </div>
      </div>
    </div>;
};
export default CreateGroup;