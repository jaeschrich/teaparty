import { SubmissionView } from 'frontend/app/submissions';
import template from './App.pug';

export class MyComponent extends Component {
    submissions = []
    state = null
    constructor(state) {
        super();
        this.state = state;
        this.submissions = new SubmissionView(state.submissions);
        super.install(template);
    }

    attach(node) {
        // beforeMount (also in constructor)
        super.attach(node)
        // afterMount
    }

    detach() {
        // beforeUnmount
        super.detach()
        // afterUnmount
    }

    handleSubmit(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.state.submit();
    }

    get valid() {
        return this.submissions.length > 0 && this.submissions.filter(x=>!x.editing).length > 0
    }
}

export function MyComponent(state) {
    let submissions = new SubmissionView(state.submissions)
    return template.install({ state, submissions });
}

let x = new MyComponent()