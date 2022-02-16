/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
interface Subject {
  // Attach an observer to the subject.
  subscribe(observer: Observer): void;

  // Detach an observer from the subject.
  unsubscribe(observer: Observer): void;

  // Notify all observers about an event.
  notify(): void;
}

/**
* The Subject owns some important state and notifies observers when the state
* changes.
*/
class ConcreteSubject implements Subject {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state: number = 0;

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer[] = [];

  /**
   * The subscription management methods.
   */
  public subscribe(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been Subscribed already.');
    }

    console.log('Subject: Subscribed an observer.');
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Unsubscribed an observer.');
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * Usually, the subscription logic is only a fraction of what a Subject can
   * really do. Subjects commonly hold some important business logic, that
   * triggers a notification method whenever something important is about to
   * happen (or after it).
   */
  public someBusinessLogic(): void {
    console.log('\nSubject: I\'m doing something important.');
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

/**
* The Observer interface declares the update method, used by subjects.
*/
interface Observer {
  // Receive update from subject.
  update(subject: Subject): void;
}

/**
* Concrete Observers react to the updates issued by the Subject they had been
* Subscribed to.
*/
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 7) {
      console.log(`ConcreteObserverA: Reacted to the event. New value: ${subject.state}`);
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && (subject.state >= 7)) {
      console.log(`ConcreteObserverB: Reacted to the event. New value: ${subject.state}`);
    }
  }
}

/**
* The client code.
*/

console.log("-- Create subject instance")
const subject = new ConcreteSubject();

console.log("-- Create observer A")
const observer1 = new ConcreteObserverA();
subject.subscribe(observer1);

console.log("-- Create observer B")
const observer2 = new ConcreteObserverB();
subject.subscribe(observer2);

console.log("-- Do some logic")
subject.someBusinessLogic();
subject.someBusinessLogic();

console.log("-- Unsubscribe observer B")
subject.unsubscribe(observer2);

subject.someBusinessLogic();