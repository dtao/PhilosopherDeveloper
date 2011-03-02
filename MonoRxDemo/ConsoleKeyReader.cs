using System;
using System.Threading;

namespace MonoRxDemo
{
	public class ConsoleKeyReader
	{
		public event EventHandler KeyPressed;
		
		public void ReadKeysUntil(ConsoleKey key)
		{
			while (Console.ReadKey().Key != key)
			{
				OnKeyPressed();
			}
		}
		
		protected void OnKeyPressed()
		{
			EventHandler handler = this.KeyPressed;
			if (handler != null)
			{
				handler(this, EventArgs.Empty);
			}
		}
	}
}