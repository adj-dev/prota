/*
  These variables represent the statuses used by projects, sprints, and tasks. These are 
  accessable to all components to use as they need them, which helps to keep this application
  DRY. To import one or several of these into a component use the following syntax:

    import { ALL } from 'relative/path/to/helpers'
                              --or--
    import { OPEN, DONE } from 'relative/path/to/helpers'

  In this way, a component has the ability to require only the specific status type(s) that it 
  requires instead of importing all types together. 

  If your component requires that you import all status types you also have the option to
  reference all exports at once:

    import * as STATUS from 'relative/path/to/helpers'

    ( referenced by STATUS.ALL or STATUS.OPEN etc... )
*/

export const ALL = 'ALL'

export const OPEN = 'OPEN'

export const IN_PROGRESS = 'IN_PROGRESS'

export const DONE = 'DONE'

export const CLOSED = 'CLOSED'