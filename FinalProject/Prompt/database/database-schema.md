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
        u9[status: active/banned]
        u10[createdAt: timestamp]

    Cards_Collection[Collection: cards]
      Card_Doc((Doc: cardId))
        c1[userId: reference]
        c2[slug: string]
        c3[fullName: string]
        c4[jobTitle: string]
        c5[slogan: string]
        c6[bio: string]
        c7[status: active/hidden/deleted]
        c8[isPhonePublic: boolean]
        c9[isEmailPublic: boolean]
        c10[createdAt: timestamp]
        c11[deletedAt: timestamp]
        c12[avatarUrl: string]
        c13[coverUrl: string]

        Theme_Object[theme: map]
          t1[templateId: reference]
          t2[primaryColor: string]
          t3[font: string]
          t4[mode: dark/light]

        AI_Config[aiConfig: map]
          ac1[aiStatus: Ready/Disabled/Error]
          ac2[systemPrompt: string]
          ac3[knowledgeData: map]
          ac4[toneOfVoice: string]
          ac5[isAiPaused: boolean]

        SocialLinks_Object[socialLinks: array of objects]
          s1[platform: string]
          s2[url: string]

    Messages_SubCollection[SubCollection: messages]
      Msg_Doc((Doc: messageId))
        m1[cardId: reference]
        m2[senderName: string]
        m3[senderEmail: string]
        m4[senderPhone: string]
        m5[content: string]
        m6[isRead: boolean]
        m7[isDeleted: boolean]
        m8[createdAt: timestamp]

    Reports_Collection[Collection: reports]
      Report_Doc((Doc: reportId))
        r1[cardId: reference]
        r2[reporterEmail: string]
        r3[reason: string]
        r4[status: pending/resolved]
        r5[createdAt: timestamp]

    Analytics_Collection[Collection: analytics_cards]
      Analytic_Doc((Doc: cardId))
        a1[totalViews: number]
        a2[vcfDownloads: number]
        a3[aiChatInteractions: number]
        a4[lastUpdated: timestamp]