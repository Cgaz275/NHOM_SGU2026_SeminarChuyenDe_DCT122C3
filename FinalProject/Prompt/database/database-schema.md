mindmap
  root((Firestore DB))
    Users_Collection[Collection: users]
      User_Doc((Doc: userId))
        u1[email: string]
        u2[phone: string]
        u3[fullName: string]
        u4[role: string - admin/user]
        u5[authProvider: string]
        u6[isVerified: boolean]
        u7[avatarUrl: string]
        u8[kycStatus: pending/verified/rejected]
        u9[createdAt: timestamp]

    Cards_Collection[Collection: cards]
      Card_Doc((Doc: cardId))
        c1[userId: reference]
        c2[slug: string]
        c3[fullName: string]
        c4[jobTitle: string]
        c5[slogan: string]
        c6[bio: string]
        c7[status: active/hidden/banned]
        c8[aiStatus: Draft/Published/Disabled/Ready/Error]
        c9[isPhonePublic: boolean]
        c10[isEmailPublic: boolean]
        c11[nfcEnabled: boolean]
        c12[autoReplyEnabled: boolean]
        c13[autoReplyMessage: string]
        c14[createdAt: timestamp]
        c15[avatarUrl: string]
        c16[coverUrl: string]

        Theme_Object[theme: map]
          t1[templateId: reference]
          t2[primaryColor: string]
          t3[font: string]
          t4[mode: dark/light]

        AI_Config[aiConfig: map]
          ac1[systemPrompt: string]
          ac2[knowledgeData: map]
          ac3[isAiPaused: boolean]
          ac4[toneOfVoice: string]

        SocialLinks_Object[socialLinks: map]
          s1[facebook: string]
          s2[github: string]

        Messages_SubCollection[SubCollection: messages]
          Msg_Doc((Doc: messageId))
            m1[senderName: string]
            m2[senderEmail: string]
            m3[content: string]
            m4[isRead: boolean]
            m5[senderPhone: string]

        Analytics_SubCollection[SubCollection: analytics]
          Analytic_Doc((Doc: analyticId))
            a1[date: string]
            a2[views: number]
            a3[qrScans: number]
            a4[messages: number]
            a5[vcfDownloads: number]
            a6[aiTokensUsed: number]

    Reports_Collection[Collection: reports]
      Report_Doc((Doc: reportId))
        r1[cardId: reference]
        r2[reportedBy: reference]
        r3[reason: string]
        r4[status: pending/resolved]
        r5[createdAt: timestamp]

    System_Analytics[Collection: analytics]
      Global_Stats((Doc: global_stats))
        g1[totalUsers: number]
        g2[totalCards: number]
        g3[totalScans: number]
        g4[totalVcfDownloads: number]
        g5[totalTokensUsed: number]