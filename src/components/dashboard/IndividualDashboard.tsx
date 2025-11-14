import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, FileText, Settings, Bell, 
  CheckCircle, Smartphone, Eye, EyeOff, Lock, 
  ArrowRight, Download, ExternalLink, Calendar, Menu, X,
  Mail, Phone, MapPin, Briefcase, Globe, Camera,
  Key, Database, UserCheck, LogOut, Trash2, Edit,
  AlertCircle, Info, Check, XCircle, Clock, ChevronRight
} from 'lucide-react';
import { Button } from '../Button';

export function IndividualDashboard() {
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'profile' | 'settings' | 'notifications'>('overview');
  const [showMenu, setShowMenu] = useState(false);
  
  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Kwame Mensah',
    email: 'kwame.mensah@example.com',
    phone: '+233 50 123 4567',
    dateOfBirth: '1990-05-15',
    address: 'Accra, Greater Accra Region',
    occupation: 'Software Engineer',
    ghanaCardNumber: 'GHA-123456789-0',
  });

  // Settings state
  const [settingsData, setSettingsData] = useState({
    twoFactorAuth: true,
    biometricLogin: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dataSharing: false,
    marketingEmails: false,
    securityAlerts: true,
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'security',
      title: 'New device login detected',
      message: 'A new device logged into your account from Accra, Ghana',
      time: '10 minutes ago',
      read: false,
      icon: Shield,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/20'
    },
    {
      id: 2,
      type: 'account',
      title: 'New account linked successfully',
      message: 'Your GCB Bank account ending in 4567 has been linked',
      time: '2 hours ago',
      read: false,
      icon: CreditCard,
      color: 'text-[#10B981]',
      bgColor: 'bg-[#10B981]/20'
    },
    {
      id: 3,
      type: 'verification',
      title: 'Identity verification approved',
      message: 'Your Ghana Card verification has been successfully completed',
      time: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'text-[#06B6D4]',
      bgColor: 'bg-[#06B6D4]/20'
    },
    {
      id: 4,
      type: 'consent',
      title: 'Consent request from LendMe App',
      message: 'LendMe App is requesting access to your bank account information',
      time: '2 days ago',
      read: true,
      icon: Lock,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/20'
    },
    {
      id: 5,
      type: 'activity',
      title: 'Unusual activity detected',
      message: 'We noticed a login attempt from an unrecognized location',
      time: '3 days ago',
      read: true,
      icon: AlertCircle,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/20'
    },
  ]);

  const linkedAccounts = [
    { 
      bank: 'Ecobank Ghana', 
      account: '1234567890', 
      type: 'Savings', 
      balance: 'GH₵ 12,450.00',
      linked: '2 weeks ago'
    },
    { 
      bank: 'MTN Mobile Money', 
      account: '+233 50 123 4567', 
      type: 'Mobile Money', 
      balance: 'GH₵ 3,200.00',
      linked: '1 month ago'
    },
  ];

  const recentActivity = [
    { action: 'Bank account verified', app: 'LendMe App', time: '2 hours ago' },
    { action: 'Consent granted', app: 'PayQuick', time: '1 day ago' },
    { action: 'Identity verified', app: 'BankNow', time: '3 days ago' },
    { action: 'Document uploaded', app: 'ReshADX', time: '1 week ago' },
  ];

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1E293B] to-[#0F172A]">
      {/* Top Navigation */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {showMenu ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-lg" />
                <span className="text-white font-bold">ReshADX</span>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`${selectedTab === 'overview' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors text-sm`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setSelectedTab('profile')}
                  className={`${selectedTab === 'profile' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setSelectedTab('settings')}
                  className={`${selectedTab === 'settings' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors text-sm`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setSelectedTab('notifications')}
                  className={`${selectedTab === 'notifications' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors text-sm relative`}
                >
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 w-5 h-5 bg-[#EF4444] text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedTab('notifications')}
                className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-white/70" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
                )}
              </button>
              <button 
                onClick={() => setSelectedTab('settings')}
                className="hidden md:block p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-white/70" />
              </button>
              <button
                onClick={() => setSelectedTab('profile')}
                className="w-9 h-9 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white/5 backdrop-blur-lg border-b border-white/10">
          <nav className="px-4 py-4 space-y-2">
            <button 
              onClick={() => { setSelectedTab('overview'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setSelectedTab('profile'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Profile
            </button>
            <button 
              onClick={() => { setSelectedTab('settings'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Settings
            </button>
            <button 
              onClick={() => { setSelectedTab('notifications'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
            >
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#EF4444] text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <>
            {/* Welcome Header with Profile */}
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border-2 border-white/30">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white text-2xl md:text-3xl mb-1">{profileData.fullName}</h1>
                    <p className="text-white/80">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#10B981]/30 border border-[#10B981]/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">Verified</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Verification Status</div>
                  <div className="text-white text-lg">100% Complete</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Linked Accounts</div>
                  <div className="text-white text-lg">{linkedAccounts.length} Accounts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 col-span-2 md:col-span-1">
                  <div className="text-white/70 text-sm mb-1">Active Apps</div>
                  <div className="text-white text-lg">3 Apps</div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
              <h2 className="text-white text-xl mb-6 m-0">Verification Status</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { 
                    icon: User, 
                    label: 'Identity Verification', 
                    status: 'Verified', 
                    date: 'Completed Nov 10, 2024',
                    color: 'text-[#10B981]',
                    bgColor: 'bg-[#10B981]/20',
                    borderColor: 'border-[#10B981]/30'
                  },
                  { 
                    icon: Smartphone, 
                    label: 'Phone Verification', 
                    status: 'Verified', 
                    date: 'Completed Nov 10, 2024',
                    color: 'text-[#10B981]',
                    bgColor: 'bg-[#10B981]/20',
                    borderColor: 'border-[#10B981]/30'
                  },
                  { 
                    icon: FileText, 
                    label: 'Document Upload', 
                    status: '3 Documents', 
                    date: 'Last updated Nov 12, 2024',
                    color: 'text-[#06B6D4]',
                    bgColor: 'bg-[#06B6D4]/20',
                    borderColor: 'border-[#06B6D4]/30'
                  },
                  { 
                    icon: Shield, 
                    label: 'Biometric Scan', 
                    status: 'Verified', 
                    date: 'Completed Nov 10, 2024',
                    color: 'text-[#10B981]',
                    bgColor: 'bg-[#10B981]/20',
                    borderColor: 'border-[#10B981]/30'
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`flex items-start gap-3 md:gap-4 p-4 ${item.bgColor} border ${item.borderColor} rounded-lg`}>
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white mb-1">{item.label}</div>
                        <div className={`${item.color} text-sm mb-1`}>{item.status}</div>
                        <div className="text-white/50 text-xs">{item.date}</div>
                      </div>
                      <CheckCircle className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Linked Accounts */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl m-0">Linked Accounts</h2>
                <button
                  onClick={() => setShowAccountNumbers(!showAccountNumbers)}
                  className="flex items-center gap-2 text-[#06B6D4] text-sm hover:underline"
                >
                  {showAccountNumbers ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span className="hidden sm:inline">Hide Numbers</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Show Numbers</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {linkedAccounts.map((account, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white mb-1">{account.bank}</div>
                          <div className="text-white/60 text-sm font-mono">
                            {showAccountNumbers ? account.account : '••••••' + account.account.slice(-4)}
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-white/50 text-xs">{account.type}</span>
                            <span className="text-white/30 text-xs">•</span>
                            <span className="text-white/50 text-xs">Linked {account.linked}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <div className="text-white mb-2">{account.balance}</div>
                        <div className="px-2 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded text-[#10B981] text-xs inline-block">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="secondary" fullWidth className="mt-4">
                <CreditCard className="w-4 h-4" />
                Link New Account
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl m-0">Recent Activity</h2>
                <button className="flex items-center gap-2 text-[#06B6D4] text-sm hover:underline">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white mb-1">{activity.action}</div>
                      <div className="text-white/60 text-sm">{activity.app}</div>
                    </div>
                    <div className="text-white/50 text-xs whitespace-nowrap">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Consent */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <h2 className="text-white text-xl mb-6 m-0">Privacy & Data Consent</h2>
              <div className="space-y-4">
                {[
                  { app: 'LendMe App', permission: 'Access to bank accounts', granted: 'Nov 12, 2024' },
                  { app: 'PayQuick', permission: 'Identity verification data', granted: 'Nov 11, 2024' },
                  { app: 'BankNow', permission: 'Transaction history', granted: 'Nov 8, 2024' },
                ].map((consent, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-black/40 border border-white/10 rounded-lg">
                    <div className="flex items-start gap-3 flex-1">
                      <Lock className="w-5 h-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white mb-1">{consent.app}</div>
                        <div className="text-white/60 text-sm mb-1">{consent.permission}</div>
                        <div className="text-white/50 text-xs">Granted on {consent.granted}</div>
                      </div>
                    </div>
                    <Button variant="tertiary" size="sm">
                      Revoke Access
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Profile Tab */}
        {selectedTab === 'profile' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl m-0">Personal Information</h2>
                <Button 
                  variant={isEditingProfile ? "primary" : "secondary"} 
                  size="sm"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  {isEditingProfile && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#06B6D4] rounded-full flex items-center justify-center border-2 border-[#0A2540] hover:bg-[#0891B2] transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-white text-xl mb-1">{profileData.fullName}</h3>
                  <p className="text-white/60 text-sm">Member since November 2024</p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Full Name</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <User className="w-5 h-5 text-white/40" />
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      ) : (
                        <span className="text-white">{profileData.fullName}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Email Address</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <Mail className="w-5 h-5 text-white/40" />
                      {isEditingProfile ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      ) : (
                        <span className="text-white">{profileData.email}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Phone Number</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <Phone className="w-5 h-5 text-white/40" />
                      <span className="text-white">{profileData.phone}</span>
                      <span className="ml-auto px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] text-xs rounded border border-[#10B981]/30">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Date of Birth</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-white/40" />
                      {isEditingProfile ? (
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      ) : (
                        <span className="text-white">{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Address</label>
                  <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-white/40" />
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="flex-1 bg-transparent text-white outline-none"
                      />
                    ) : (
                      <span className="text-white">{profileData.address}</span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Occupation</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white/40" />
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.occupation}
                          onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      ) : (
                        <span className="text-white">{profileData.occupation}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Ghana Card Number</label>
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-lg">
                      <Shield className="w-5 h-5 text-white/40" />
                      <span className="text-white font-mono">{profileData.ghanaCardNumber}</span>
                      <span className="ml-auto px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] text-xs rounded border border-[#10B981]/30">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <h2 className="text-white text-xl mb-6 m-0">Account Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#06B6D4]" />
                    <div>
                      <div className="text-white group-hover:text-[#06B6D4] transition-colors">Download My Data</div>
                      <div className="text-white/60 text-sm">Export all your personal information</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-[#F59E0B]" />
                    <div>
                      <div className="text-white group-hover:text-[#F59E0B] transition-colors">Sign Out</div>
                      <div className="text-white/60 text-sm">Sign out from this device</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 rounded-lg transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-[#EF4444]" />
                    <div>
                      <div className="text-[#EF4444]">Delete Account</div>
                      <div className="text-white/60 text-sm">Permanently delete your account and data</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#EF4444]/40" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {selectedTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Security Settings */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#06B6D4]" />
                <h2 className="text-white text-xl m-0">Security Settings</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: 'twoFactorAuth',
                    label: 'Two-Factor Authentication',
                    description: 'Add an extra layer of security to your account',
                    icon: Key,
                  },
                  {
                    key: 'biometricLogin',
                    label: 'Biometric Login',
                    description: 'Use fingerprint or face recognition to login',
                    icon: Smartphone,
                  },
                  {
                    key: 'securityAlerts',
                    label: 'Security Alerts',
                    description: 'Get notified of suspicious activity',
                    icon: AlertCircle,
                  },
                ].map((setting) => {
                  const Icon = setting.icon;
                  return (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-white mb-1">{setting.label}</div>
                          <div className="text-white/60 text-sm">{setting.description}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettingsData({...settingsData, [setting.key]: !settingsData[setting.key as keyof typeof settingsData]})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settingsData[setting.key as keyof typeof settingsData] ? 'bg-[#10B981]' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          settingsData[setting.key as keyof typeof settingsData] ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/80 m-0">
                    Two-factor authentication significantly improves your account security. We recommend keeping it enabled.
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#06B6D4]" />
                <h2 className="text-white text-xl m-0">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: 'emailNotifications',
                    label: 'Email Notifications',
                    description: 'Receive notifications via email',
                  },
                  {
                    key: 'smsNotifications',
                    label: 'SMS Notifications',
                    description: 'Receive notifications via text message',
                  },
                  {
                    key: 'pushNotifications',
                    label: 'Push Notifications',
                    description: 'Receive push notifications on your device',
                  },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <div className="text-white mb-1">{setting.label}</div>
                      <div className="text-white/60 text-sm">{setting.description}</div>
                    </div>
                    <button
                      onClick={() => setSettingsData({...settingsData, [setting.key]: !settingsData[setting.key as keyof typeof settingsData]})}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settingsData[setting.key as keyof typeof settingsData] ? 'bg-[#10B981]' : 'bg-white/20'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settingsData[setting.key as keyof typeof settingsData] ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-[#06B6D4]" />
                <h2 className="text-white text-xl m-0">Privacy & Data</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: 'dataSharing',
                    label: 'Data Sharing with Partners',
                    description: 'Allow ReshADX to share anonymized data with trusted partners',
                  },
                  {
                    key: 'marketingEmails',
                    label: 'Marketing Communications',
                    description: 'Receive updates about new features and offers',
                  },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <div className="text-white mb-1">{setting.label}</div>
                      <div className="text-white/60 text-sm">{setting.description}</div>
                    </div>
                    <button
                      onClick={() => setSettingsData({...settingsData, [setting.key]: !settingsData[setting.key as keyof typeof settingsData]})}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settingsData[setting.key as keyof typeof settingsData] ? 'bg-[#10B981]' : 'bg-white/20'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settingsData[setting.key as keyof typeof settingsData] ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Key className="w-5 h-5 text-[#06B6D4]" />
                <h2 className="text-white text-xl m-0">Change Password</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/40 outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/40 outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/40 outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
                <Button variant="primary" fullWidth>
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {selectedTab === 'notifications' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#06B6D4]" />
                  <h2 className="text-white text-xl m-0">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-[#EF4444] text-white text-xs rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button variant="tertiary" size="sm" onClick={markAllAsRead}>
                    <Check className="w-4 h-4" />
                    Mark all as read
                  </Button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div 
                        key={notification.id} 
                        className={`p-4 rounded-lg border transition-all ${
                          notification.read 
                            ? 'bg-black/20 border-white/5' 
                            : 'bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${notification.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`${notification.read ? 'text-white/70' : 'text-white'} m-0`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#06B6D4] rounded-full flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-white/60 text-sm mb-2 m-0">{notification.message}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-white/50 text-xs">{notification.time}</span>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-[#06B6D4] text-xs hover:underline"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-[#EF4444] text-xs hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
