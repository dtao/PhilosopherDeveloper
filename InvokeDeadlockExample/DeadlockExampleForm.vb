Imports System.Threading

Public Class DeadlockExampleForm

    Private _unlocked As New ManualResetEvent(False)

    Private Sub BigButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles BigButton.Click
        Dim t As New Thread(AddressOf Deadlock)
        t.Start()

        Me.Text = "Entering Deadlock"

        ' This line will wait forever.
        _unlocked.WaitOne()
    End Sub

    Private Sub Deadlock()
        ' Invoke is a blocking call. This thread will not continue past this
        ' line until the Click event handler above runs. Until _unlocked is
        ' signalled below, this will never happen.
        Invoke(New Action(AddressOf NotifyComplete))

        ' This line will never be reached.
        _unlocked.Set()
    End Sub

    Private Sub NotifyComplete()
        Me.Text = "Escaped Deadlock"
    End Sub

End Class
