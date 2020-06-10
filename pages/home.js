export default {
  name: 'Home',
  content: {
    type: 'users'
  },
  rootId: 'root',
  items: {
    'root': {
      id: 'root',
      children: ['container-1', 'container-2', 'story-4'],
      hasChildren: true,
      isExpanded: true,
      component: {
        type: 'root'
      }
    },
    'container-1': {
      id: 'container-1',
      children: ['banner-1', 'story-1', 'story-2'],
      hasChildren: true,
      isExpanded: true,
      component: {
        type: 'container'
      }
    },
    'container-2': {
      id: 'container-2',
      children: ['story-3'],
      hasChildren: true,
      isExpanded: true,
      component: {
        type: 'container'
      }
    },
    'banner-1': {
      id: 'banner-1',
      children: [],
      component: {
        type: 'banner'
      }
    },
    'story-1': {
      id: 'story-1',
      children: [],
      component: {
        type: 'story',
        options: {
          id: "1"
        }
      }
    },
    'story-2': {
      id: 'story-2',
      children: [],
      component: {
        type: 'story',
        options: {
          id: "2"
        }
      }
    },
    'story-3': {
      id: 'story-3',
      children: [],
      component: {
        type: 'story',
        options: {
          id: "3"
        }
      }
    },
    'story-4': {
      id: 'story-4',
      children: [],
      component: {
        type: 'story',
        options: {
          id: "4"
        }
      }
    },
  }
};
