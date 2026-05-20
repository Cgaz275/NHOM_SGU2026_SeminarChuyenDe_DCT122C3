/**
 * Card/Profile Test Fixtures
 * 
 * Test data cho Card Management (Profile Builder) tests
 * Tuân thủ: test_cases_guideline.md & TEST PLAN.md
 */

// ============================================================
// VALID CARD TEST DATA
// ============================================================

export const validCards = {
  basicCard: {
    id: 'card-001',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Full-stack developer with 5+ years experience',
      location: 'San Francisco, CA',
      avatar: 'https://via.placeholder.com/150?text=John',
      website: 'https://johndoe.com',
    },
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/johndoe',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/johndoe',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/johndoe',
      },
    ],
    sections: {
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          startDate: '2021-01-01',
          endDate: null,
          isCurrent: true,
          description: 'Led development of scalable cloud infrastructure',
        },
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Firebase', 'TypeScript'],
      projects: [
        {
          title: 'Digital Twin Card Platform',
          description: 'AI-powered business card system',
          link: 'https://github.com/johndoe/digital-twin',
          image: 'https://via.placeholder.com/300',
        },
      ],
    },
    isDraft: false,
    isPublished: true,
    slug: 'john-doe',
    publishedAt: new Date('2026-01-15'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-15'),
  },

  minimalCard: {
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    isDraft: true,
    isPublished: false,
  },

  cardWithUnicode: {
    personalInfo: {
      firstName: 'Nguyễn',
      lastName: 'Văn An',
      email: 'nguyevan@example.com',
      bio: '👨‍💻 Developer 💻 based in 🇻🇳 Vietnam',
    },
  },
};

// ============================================================
// CARD CREATION TEST DATA
// ============================================================

export const cardCreationTestData = {
  TC_CARD_001: {
    // Happy path: Create card with minimum required fields
    input: {
      personalInfo: {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
      },
    },
    expected: {
      success: true,
      statusCode: 201,
      hasId: true,
      hasSlug: true,
      isDraft: true,
      isPublished: false,
    },
  },

  TC_CARD_002: {
    // Happy path: Create card with all fields
    input: {
      personalInfo: {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.com',
        phone: '+1-555-0100',
        bio: 'Product Manager',
        location: 'New York, NY',
        website: 'https://bobsmith.com',
      },
      socialLinks: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/bobsmith',
        },
      ],
      sections: {
        experience: [
          {
            company: 'StartUp Inc',
            position: 'Product Manager',
            startDate: '2022-01-01',
            isCurrent: true,
            description: 'Leading product strategy',
          },
        ],
        skills: ['Product Management', 'Analytics', 'Leadership'],
      },
    },
    expected: {
      success: true,
      statusCode: 201,
      hasAllFields: true,
    },
  },

  TC_CARD_003: {
    // Error: Missing required firstName
    input: {
      personalInfo: {
        lastName: 'Doe',
        email: 'test@example.com',
      },
    },
    expected: {
      success: false,
      statusCode: 400,
      errorField: 'firstName',
      errorMessage: 'First name is required',
    },
  },

  TC_CARD_004: {
    // Error: Missing required email
    input: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
    expected: {
      success: false,
      statusCode: 400,
      errorField: 'email',
    },
  },

  TC_CARD_005: {
    // Error: Invalid email format
    input: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid.email',
      },
    },
    expected: {
      success: false,
      statusCode: 400,
      errorField: 'email',
    },
  },

  TC_CARD_006: {
    // Edge case: Very long bio
    input: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        bio: 'a'.repeat(1000),
      },
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },

  TC_CARD_007: {
    // Edge case: Many social links
    input: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      },
      socialLinks: Array.from({ length: 20 }, (_, i) => ({
        platform: `social${i}`,
        url: `https://social${i}.com/user`,
      })),
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },

  TC_CARD_008: {
    // Performance: Card creation time < 1s
    input: {
      personalInfo: {
        firstName: 'Perf Test',
        lastName: 'User',
        email: 'perf@example.com',
      },
    },
    expected: {
      success: true,
      statusCode: 201,
      maxResponseTime: 1000, // milliseconds
    },
  },
};

// ============================================================
// CARD EDITING TEST DATA
// ============================================================

export const cardEditingTestData = {
  TC_CARD_009: {
    // Happy path: Update personal info
    input: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Smith', // Changed from Doe
        bio: 'Updated bio',
      },
    },
    expected: {
      success: true,
      statusCode: 200,
      updated: ['lastName', 'bio'],
    },
  },

  TC_CARD_010: {
    // Happy path: Add experience
    input: {
      sections: {
        experience: [
          {
            company: 'New Company',
            position: 'Lead Developer',
            startDate: '2024-01-01',
            isCurrent: true,
          },
        ],
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_CARD_011: {
    // Error: Editing someone else's card
    input: {
      cardId: 'other-user-card',
      personalInfo: {
        firstName: 'Hacker',
      },
    },
    expected: {
      success: false,
      statusCode: 403,
      errorMessage: 'Forbidden: Only card owner can edit',
    },
  },

  TC_CARD_012: {
    // Edge case: Clear optional fields
    input: {
      personalInfo: {
        bio: null,
        website: null,
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

// ============================================================
// CARD PUBLISHING TEST DATA
// ============================================================

export const cardPublishingTestData = {
  TC_CARD_013: {
    // Happy path: Publish draft card
    input: {
      cardId: 'draft-card-id',
    },
    expected: {
      success: true,
      statusCode: 200,
      isPublished: true,
      publicUrl: expect.stringContaining('/u/'),
    },
  },

  TC_CARD_014: {
    // Happy path: Unpublish card
    input: {
      cardId: 'published-card-id',
      action: 'unpublish',
    },
    expected: {
      success: true,
      statusCode: 200,
      isPublished: false,
    },
  },

  TC_CARD_015: {
    // Error: Publish with missing required fields
    input: {
      cardId: 'incomplete-card',
    },
    expected: {
      success: false,
      statusCode: 400,
      errorMessage: 'Cannot publish: Missing required fields',
    },
  },
};

// ============================================================
// SLUG GENERATION TEST DATA
// ============================================================

export const slugTestData = {
  TC_CARD_016: {
    // Happy path: Generate unique slug
    input: {
      firstName: 'John',
      lastName: 'Doe',
    },
    expected: {
      slug: 'john-doe',
      isUnique: true,
    },
  },

  TC_CARD_017: {
    // Duplicate slug: Auto-increment
    input: {
      firstName: 'John',
      lastName: 'Doe', // Same as TC_CARD_016
      existingSlug: 'john-doe',
    },
    expected: {
      slug: 'john-doe-2', // Or john-doe-1
      isUnique: true,
    },
  },

  TC_CARD_018: {
    // Unicode slug handling
    input: {
      firstName: 'Nguyễn',
      lastName: 'Văn An',
    },
    expected: {
      slug: 'nguyen-van-an', // Slugified
      isUnique: true,
    },
  },
};

// ============================================================
// CARD PREVIEW TEST DATA
// ============================================================

export const cardPreviewTestData = {
  TC_CARD_019: {
    // Happy path: Get public card preview
    input: {
      slug: 'john-doe',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasPersonalInfo: true,
      hasExperience: true,
      isPublished: true,
    },
  },

  TC_CARD_020: {
    // Error: Card not found
    input: {
      slug: 'non-existent-user',
    },
    expected: {
      success: false,
      statusCode: 404,
      errorMessage: 'Card not found',
    },
  },

  TC_CARD_021: {
    // Error: Unpublished card not accessible
    input: {
      slug: 'draft-card-slug',
      isDraft: true,
    },
    expected: {
      success: false,
      statusCode: 404,
      errorMessage: 'Card not found',
    },
  },

  TC_CARD_022: {
    // Mobile responsive: Public card
    input: {
      slug: 'john-doe',
      viewport: 'mobile',
    },
    expected: {
      success: true,
      statusCode: 200,
      responsive: true,
    },
  },
};

// ============================================================
// CARD DELETION TEST DATA
// ============================================================

export const cardDeletionTestData = {
  TC_CARD_023: {
    // Happy path: Delete own card
    input: {
      cardId: 'my-card-id',
    },
    expected: {
      success: true,
      statusCode: 200,
      message: 'Card deleted successfully',
    },
  },

  TC_CARD_024: {
    // Error: Delete someone else's card
    input: {
      cardId: 'other-user-card',
    },
    expected: {
      success: false,
      statusCode: 403,
      errorMessage: 'Forbidden: Only card owner can delete',
    },
  },
};

// ============================================================
// CARD SECTIONS TEST DATA
// ============================================================

export const sectionTestData = {
  TC_CARD_025: {
    // Add experience section
    input: {
      section: 'experience',
      data: {
        company: 'Tech Corp',
        position: 'Developer',
        startDate: '2020-01-01',
        description: 'Built web applications',
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_CARD_026: {
    // Edit experience section
    input: {
      section: 'experience',
      id: 'exp-001',
      data: {
        position: 'Senior Developer', // Updated
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_CARD_027: {
    // Delete experience section
    input: {
      section: 'experience',
      id: 'exp-001',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_CARD_028: {
    // Add skills
    input: {
      section: 'skills',
      data: ['JavaScript', 'React', 'Node.js'],
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_CARD_029: {
    // Add projects
    input: {
      section: 'projects',
      data: {
        title: 'Project Name',
        description: 'Project description',
        link: 'https://github.com/project',
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

// ============================================================
// EXPORT HELPER FUNCTIONS
// ============================================================

export function getTestCard(cardName: keyof typeof validCards) {
  return validCards[cardName];
}

export function getCardTestData(
  type: 'creation' | 'editing' | 'publishing' | 'slug' | 'preview' | 'deletion' | 'sections',
  caseId: string,
) {
  const dataMap = {
    creation: cardCreationTestData,
    editing: cardEditingTestData,
    publishing: cardPublishingTestData,
    slug: slugTestData,
    preview: cardPreviewTestData,
    deletion: cardDeletionTestData,
    sections: sectionTestData,
  };

  return dataMap[type][caseId as any];
}

export function createRandomCard() {
  const randomId = Math.random().toString(36).substring(7);
  return {
    personalInfo: {
      firstName: `FirstName${randomId}`,
      lastName: `LastName${randomId}`,
      email: `card${randomId}@example.com`,
    },
  };
}

export function resetCardFixtures() {
  // Reset fixture data to initial state
  return true;
}
