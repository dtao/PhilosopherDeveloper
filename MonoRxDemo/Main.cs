using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace MonoRxDemo
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			var consoleKeyReader = new ConsoleKeyReader();
			
			IObservable<IEvent<EventArgs>> keyEvents = Observable.FromEvent<EventArgs>(consoleKeyReader, "KeyPressed");
			
			int keyPressCount = 0;
			
			Action<IEvent<EventArgs>> incrementKeyCount = e => Interlocked.Increment(ref keyPressCount);
			Action<IEvent<EventArgs>> displayKeyCount = e =>
			{
				int currentKeyCount = Interlocked.Exchange(ref keyPressCount, 0);
				Console.WriteLine();
				Console.WriteLine("Key pressed {0} times in the last 2.5 seconds.", currentKeyCount);
			};
			
			Console.WriteLine("Start typing and hit ESC to quit.");
			using (var s1 = keyEvents.Subscribe(incrementKeyCount))
			using (var s2 = keyEvents.Sample(TimeSpan.FromSeconds(2.5)).Subscribe(displayKeyCount))
			{
				consoleKeyReader.ReadKeysUntil(ConsoleKey.Escape);
			}
		}
	}
}